/* ==========================================================================
   Gridly — Backend (Express)
   Lead capture (Supabase) + PDF proposal generation (pdfkit)
   ========================================================================== */
require('dotenv').config();

const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const { createClient } = require('@supabase/supabase-js');

const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    '[gridly] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set — ' +
    'copy .env.example to .env and fill them in, or /api/leads will fail. ' +
    'See sql/schema.sql for the table this expects.'
  );
}

const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    })
  : null;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

/* --------------------------------------------------------------------------
   POST /api/leads
   Stores a captured lead (contact form / estimator) in Supabase.
   -------------------------------------------------------------------------- */
app.post('/api/leads', async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase is not configured on the server.' });
  }

  const { name, phone, email, business_type, message, selected_package, calculated_price } = req.body || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'name is required.' });
  }
  if ((!phone || !phone.trim()) && (!email || !email.trim())) {
    return res.status(400).json({ error: 'phone or email is required.' });
  }

  const { data, error } = await supabase
    .from('leads')
    .insert({
      name: name.trim(),
      phone: phone ? phone.trim() : null,
      email: email ? email.trim() : null,
      business_type: business_type || null,
      message: message || null,
      selected_package: selected_package || null,
      calculated_price: calculated_price || null,
      status: 'New',
    })
    .select()
    .single();

  if (error) {
    console.error('[gridly] Supabase insert failed:', error.message);
    return res.status(500).json({ error: 'Could not save lead.' });
  }

  return res.status(201).json({ lead: data });
});

/* --------------------------------------------------------------------------
   POST /api/download-proposal
   Streams back a branded PDF proposal built from the estimator selection.
   -------------------------------------------------------------------------- */
app.post('/api/download-proposal', (req, res) => {
  const { name, contact, breakdown, total, currency, timeframeMin, timeframeMax } = req.body || {};

  if (!Array.isArray(breakdown) || !breakdown.length || !total || !currency) {
    return res.status(400).json({ error: 'Missing estimate details.' });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="gridly-proposal.pdf"');

  const doc = new PDFDocument({ size: 'A4', margin: 0 });
  doc.pipe(res);

  buildProposal(doc, {
    name: safeText(name) || 'Valued Client',
    contact: safeText(contact) || '-',
    breakdown,
    total,
    currency,
    timeframeMin,
    timeframeMax,
  });

  doc.end();
});

/* ---------------- PDF rendering ---------------- */

// Colors mirror the site's dark theme (see :root in styles.css).
const COLORS = {
  bg: '#0f1117',
  panel: '#12141c',
  border: '#23262f',
  text: '#f2f3f7',
  dim: '#a7abbd',
  accent: '#6366f1',
  accent2: '#22d3ee',
};

// pdfkit's built-in Helvetica only covers Latin/WinAnsi glyphs. If a Unicode
// font that covers Georgian is dropped in fonts/, use it automatically so
// client names / notes typed in Georgian render correctly; otherwise fall
// back to Helvetica (Latin text still renders fine, Georgian text will not).
const GEORGIAN_FONT_REGULAR = path.join(__dirname, 'fonts', 'NotoSansGeorgian-Regular.ttf');
const GEORGIAN_FONT_BOLD = path.join(__dirname, 'fonts', 'NotoSansGeorgian-Bold.ttf');
const HAS_GEORGIAN_FONT = fs.existsSync(GEORGIAN_FONT_REGULAR);

function safeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function registerFonts(doc) {
  if (HAS_GEORGIAN_FONT) {
    doc.registerFont('body', GEORGIAN_FONT_REGULAR);
    doc.registerFont('bold', fs.existsSync(GEORGIAN_FONT_BOLD) ? GEORGIAN_FONT_BOLD : GEORGIAN_FONT_REGULAR);
  } else {
    doc.registerFont('body', 'Helvetica');
    doc.registerFont('bold', 'Helvetica-Bold');
  }
}

function formatTimeframe(min, max) {
  const lo = Number(min) || 0;
  const hi = Number(max) || lo;
  if (hi <= 96) return `${lo}-${hi} hours`;
  return `${Math.round(lo / 24)}-${Math.round(hi / 24)} days`;
}

function buildProposal(doc, data) {
  const pageW = doc.page.width;
  const pageH = doc.page.height;
  const marginX = 50;

  registerFonts(doc);

  // Full-page dark background
  doc.rect(0, 0, pageW, pageH).fill(COLORS.bg);

  // Header band
  doc.rect(0, 0, pageW, 130).fill(COLORS.accent);
  doc.circle(marginX + 20, 55, 20).fill('#ffffff');
  doc.font('bold').fontSize(20).fillColor(COLORS.accent).text('G', marginX + 12, 44);
  doc.font('bold').fontSize(24).fillColor('#ffffff').text('Gridly', marginX + 52, 40);
  doc.font('body').fontSize(11).fillColor('rgba(255,255,255,0.85)')
    .text('Modern websites for local businesses', marginX + 52, 68);

  doc.font('bold').fontSize(13).fillColor('#ffffff')
    .text('OFFICIAL PROJECT PROPOSAL', 0, 44, { align: 'right', width: pageW - marginX });
  doc.font('body').fontSize(10).fillColor('rgba(255,255,255,0.8)')
    .text(new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }), 0, 66, {
      align: 'right',
      width: pageW - marginX,
    });

  let y = 165;

  // Client details
  doc.font('bold').fontSize(12).fillColor(COLORS.text).text('Prepared for', marginX, y);
  y += 20;
  doc.font('body').fontSize(11).fillColor(COLORS.dim).text(`Name: ${data.name}`, marginX, y);
  y += 16;
  doc.font('body').fontSize(11).fillColor(COLORS.dim).text(`Contact: ${data.contact}`, marginX, y);
  y += 34;

  doc.moveTo(marginX, y).lineTo(pageW - marginX, y).strokeColor(COLORS.border).lineWidth(1).stroke();
  y += 26;

  // Breakdown table
  doc.font('bold').fontSize(12).fillColor(COLORS.text).text('Selected Features & Pricing', marginX, y);
  y += 26;

  const colItemW = pageW - marginX * 2 - 120;

  data.breakdown.forEach((row, i) => {
    if (i % 2 === 0) {
      doc.rect(marginX, y - 6, pageW - marginX * 2, 26).fill(COLORS.panel);
    }
    doc.font('body').fontSize(10.5).fillColor(COLORS.text)
      .text(row.label, marginX + 12, y, { width: colItemW });
    doc.font('bold').fontSize(10.5).fillColor(COLORS.accent2)
      .text(`+${row.priceDisplay} ${data.currency}`, marginX, y, {
        width: pageW - marginX * 2 - 12,
        align: 'right',
      });
    y += 26;
  });

  y += 10;
  doc.moveTo(marginX, y).lineTo(pageW - marginX, y).strokeColor(COLORS.border).lineWidth(1).stroke();
  y += 24;

  // Total
  doc.font('bold').fontSize(14).fillColor(COLORS.text).text('Total Estimated Cost', marginX, y);
  doc.font('bold').fontSize(20).fillColor(COLORS.accent2)
    .text(`${data.total} ${data.currency}`, marginX, y - 4, { width: pageW - marginX * 2, align: 'right' });
  y += 36;

  // Timeframe
  doc.font('body').fontSize(11).fillColor(COLORS.dim)
    .text(`Estimated delivery: ${formatTimeframe(data.timeframeMin, data.timeframeMax)}`, marginX, y);
  y += 40;

  doc.font('body').fontSize(9.5).fillColor(COLORS.dim)
    .text(
      'This is an automatically generated estimate based on the options selected on gridly.ge. ' +
      'Final pricing is confirmed after a short consultation and may vary based on project specifics.',
      marginX,
      y,
      { width: pageW - marginX * 2, lineGap: 3 }
    );

  // Footer
  const footerY = pageH - 70;
  doc.moveTo(marginX, footerY).lineTo(pageW - marginX, footerY).strokeColor(COLORS.border).lineWidth(1).stroke();
  doc.font('bold').fontSize(10).fillColor(COLORS.text).text('Gridly', marginX, footerY + 14);
  doc.font('body').fontSize(9.5).fillColor(COLORS.dim)
    .text('info@gridly.com   |   gridly.ge', marginX, footerY + 30);
}

app.listen(PORT, () => {
  console.log(`[gridly] server listening on http://localhost:${PORT}`);
});
