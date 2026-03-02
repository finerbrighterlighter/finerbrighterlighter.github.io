/**
 * OpenAlex Scholarly Impact Dashboard
 * Author: Htun Teza (Fine)
 * Functionality: Fetches live data from OpenAlex, calculates recent vs career metrics,
 * and renders a dual-axis SVG chart with vertical padding.
 */

const authorId = "A5065083669";
const graphDisplayYears = 10; // Parameter: Number of years to show in the chart

/**
 * Fetches data from OpenAlex Author and Works endpoints concurrently.
 */
async function fetchOpenAlexData() {
  const [authRes, worksRes] = await Promise.all([
    fetch(`https://api.openalex.org/authors/${authorId}`),
    fetch(`https://api.openalex.org/works?filter=author.id:${authorId}&per_page=200`)
  ]);
  
  if (!authRes.ok || !worksRes.ok) throw new Error("OpenAlex API failure");
  
  return {
    author: await authRes.json(),
    works: (await worksRes.json()).results
  };
}

/**
 * Processes raw data to calculate metrics and pad the timeline for the chart.
 */
function processData(author, works, cutoffYear) {
  // Filter for peer-reviewed journal articles
  const journalWorks = works.filter(w => w.type === "article" || w.type === "preprint");
  const recentWorks = journalWorks.filter(w => w.publication_year >= cutoffYear);

  // Helper: Calculate H-index from a specific list of works
  const calculateH = (workList) => {
    const cites = workList.map(w => w.cited_by_count).sort((a, b) => b - a);
    let h = 0;
    for (let i = 0; i < cites.length; i++) {
      if (cites[i] >= i + 1) h = i + 1;
      else break;
    }
    return h;
  };

  // Generate continuous timeline (Zero-padding gaps in career)
  const startYear = Math.min(...author.counts_by_year.map(y => y.year));
  const endYear = new Date().getFullYear();
  const timeline = [];
  let runningCitationTotal = 0;

  for (let y = startYear; y <= endYear; y++) {
    const yearData = author.counts_by_year.find(d => d.year === y) || { works_count: 0, cited_by_count: 0 };
    runningCitationTotal += yearData.cited_by_count;
    
    timeline.push({
      year: y,
      pubs: yearData.works_count,
      cumulativeCitations: runningCitationTotal
    });
  }

  return {
    metrics: {
      all: { 
        pubs: journalWorks.length, 
        h: author.summary_stats.h_index, 
        i10: author.summary_stats.i10_index, 
        totalCites: author.cited_by_count 
      },
      recent: { 
        pubs: recentWorks.length, 
        h: calculateH(recentWorks), 
        i10: recentWorks.filter(w => w.cited_by_count >= 10).length,
        inflow: author.counts_by_year.filter(y => y.year >= cutoffYear).reduce((s, y) => s + y.cited_by_count, 0)
      }
    },
    timeline
  };
}

/**
 * Renders the dual-axis line/bar chart using SVG.
 */
function renderChartSVG(timeline) {
  const width = 450;
  const height = 150;
  const paddingX = 40; 
  const paddingY = 30;
  const buffer = 0.1; // 10% vertical buffer to prevent points touching axis labels

  const maxPubs = Math.max(...timeline.map(d => d.pubs), 1);
  const minPubs = Math.min(...timeline.map(d => d.pubs));
  const maxCites = Math.max(...timeline.map(d => d.cumulativeCitations), 1);
  const minCites = Math.min(...timeline.map(d => d.cumulativeCitations));

  const barWidth = (width - (paddingX * 2)) / timeline.length;

  // Y Scaling: Cumulative Citations (Always floored with buffer)
  const getLineY = (val) => {
    const range = maxCites - minCites;
    if (range === 0) return height / 2;
    const normalized = (val - minCites) / range;
    const buffered = buffer + (normalized * (1 - 2 * buffer));
    return height - paddingY - (buffered * (height - paddingY * 2));
  };

  // Y Scaling: Publications (True zero logic: 0 is 0 height, non-zero is buffered)
  const getBarH = (val) => {
    if (val === 0) return 0;
    const range = maxPubs - minPubs;
    const availableHeight = height - paddingY * 2;
    if (range === 0) return availableHeight * (buffer + 0.5 * (1 - 2 * buffer));
    const normalized = (val - minPubs) / range;
    const bufferedScale = buffer + (normalized * (1 - buffer));
    return bufferedScale * availableHeight;
  };

  const linePoints = timeline.map((d, i) => {
    const x = paddingX + (i * barWidth) + (barWidth / 2);
    return `${x},${getLineY(d.cumulativeCitations)}`;
  }).join(" ");

  return `
  <svg viewBox="0 0 ${width} ${height}" id="oa-svg" style="width:100%; height:auto; font-family:sans-serif; overflow: visible;">
    <circle cx="18" cy="${paddingY}" r="10" fill="#444" />
    <text x="18" y="${paddingY + 4}" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">${maxPubs}</text>
    <circle cx="18" cy="${height - paddingY}" r="10" fill="#444" />
    <text x="18" y="${height - paddingY + 4}" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">${minPubs}</text>
    <line x1="${paddingX - 5}" y1="${paddingY}" x2="${paddingX - 5}" y2="${height - paddingY}" stroke="#333" />

    <circle cx="${width - 18}" cy="${paddingY}" r="10" fill="#fff" />
    <text x="${width - 18}" y="${paddingY + 4}" font-size="11" font-weight="bold" fill="#444" text-anchor="middle">${maxCites}</text>
    <circle cx="${width - 18}" cy="${height - paddingY}" r="10" fill="#fff" />
    <text x="${width - 18}" y="${height - paddingY + 4}" font-size="11" font-weight="bold" fill="#444" text-anchor="middle">${minCites}</text>
    <line x1="${width - paddingX + 5}" y1="${paddingY}" x2="${width - paddingX + 5}" y2="${height - paddingY}" stroke="#333" />

    ${timeline.map((d, i) => `
      <rect class="oa-bar" data-year="${d.year}" data-pubs="${d.pubs}" data-cites="${d.cumulativeCitations}"
        x="${paddingX + (i * barWidth) + 2}" y="${height - paddingY - getBarH(d.pubs)}" 
        width="${barWidth - 4}" height="${getBarH(d.pubs)}" fill="#444" opacity="0.8" rx="2" />
    `).join("")}

    <polyline points="${linePoints}" fill="none" stroke="#fff" stroke-width="2" />
    ${timeline.map((d, i) => `<circle cx="${paddingX + (i * barWidth) + (barWidth / 2)}" cy="${getLineY(d.cumulativeCitations)}" r="3" fill="#fff" />`).join("")}

    <text x="${paddingX}" y="${height - 10}" font-size="10" fill="#888">${timeline[0].year}</text>
    <text x="${width - paddingX}" y="${height - 10}" font-size="10" fill="#888" text-anchor="end">${timeline[timeline.length - 1].year}</text>
  </svg>`;
}

/**
 * Main function to load and inject metrics into the Jekyll element.
 */
async function loadOpenAlexMetrics(elementId) {
    const element = document.getElementById(elementId);
    const cutoffYear = new Date().getFullYear() - 5;
    
    try {
      const raw = await fetchOpenAlexData();
      const data = processData(raw.author, raw.works, cutoffYear);
      const graphTimeline = data.timeline.slice(-graphDisplayYears);
      
      element.innerHTML = `
        <table style="width:100%; border-collapse:collapse; margin-bottom:15px; font-size:14px;">
              <thead>
                  <tr style="border-bottom:1px solid #444; color:#fff;">
                      <th style="text-align: left; padding: 8px 0;">Metric</th>
                      <th style="text-align: center; padding: 8px 0;">Career</th>
                      <th style="text-align: center; padding: 8px 0;">Since ${cutoffYear}</th>
                  </tr>
              </thead>
              <tbody>
                  <tr><td style="padding: 4px 0;">Works</td><td style="text-align: center;">${data.metrics.all.pubs}</td><td style="text-align: center;">${data.metrics.recent.pubs}</td></tr>
                  <tr><td style="padding: 4px 0;">Citations</td><td style="text-align: center;">${data.metrics.all.totalCites}</td><td style="text-align: center;">${data.metrics.recent.inflow}</td></tr>
                  <tr><td style="padding: 4px 0;">h-index</td><td style="text-align: center;">${data.metrics.all.h}</td><td style="text-align: center;">${data.metrics.recent.h}</td></tr>
                  <tr><td style="padding: 4px 0;">i10-index</td><td style="text-align: center;">${data.metrics.all.i10}</td><td style="text-align: center;">${data.metrics.recent.i10}</td></tr>
              </tbody>
          </table>
        
        <div id="oa-chart-container" style="position:relative;">
          <div id="oa-tooltip" style="position:absolute; background:rgba(0,0,0,0.95); color:#fff; font-size:11px; padding:8px; border-radius:4px; opacity:0; pointer-events:none; z-index:100; border:1px solid #fff; white-space:nowrap; transition: opacity 0.1s;"></div>
          ${renderChartSVG(graphTimeline)}
        </div>
  
        <div style="display:flex; justify-content:space-between; font-size:10px; color:#fff; margin-top:10px; border-top:1px solid #333; padding-top:5px;">
          <span>Source: OpenAlex API</span>
          <span>Updated: ${new Date(raw.author.updated_date).toISOString().slice(0,10)}</span>
        </div>
      `;
  
      // Tooltip Collision Detection & Interaction
      const tooltip = document.getElementById("oa-tooltip");
      document.querySelectorAll(".oa-bar").forEach(bar => {
          bar.addEventListener("mouseenter", () => {
              tooltip.innerHTML = `<strong>${bar.dataset.year}</strong><br>Works: ${bar.dataset.pubs}<br>Citations: ${bar.dataset.cites}`;
              tooltip.style.opacity = 1;
          });
          
          bar.addEventListener("mousemove", (e) => {
              const container = document.getElementById("oa-chart-container");
              const rect = container.getBoundingClientRect();
              const mouseX = e.clientX - rect.left;
              const mouseY = e.clientY - rect.top;
              
              // Flip tooltip to left side if past midpoint to prevent sidebar cutoff
              if (mouseX > (rect.width / 2)) {
                  tooltip.style.left = "auto";
                  tooltip.style.right = (rect.width - mouseX + 15) + "px";
              } else {
                  tooltip.style.right = "auto";
                  tooltip.style.left = (mouseX + 15) + "px";
              }
              tooltip.style.top = (mouseY - 45) + "px";
          });
          
          bar.addEventListener("mouseleave", () => tooltip.style.opacity = 0);
      });
  
    } catch (err) {
      element.innerHTML = `<p style="color:red; font-size:12px;">Error: ${err.message}</p>`; 
    }
  }
  
// Execution
loadOpenAlexMetrics("openalex-metrics");
