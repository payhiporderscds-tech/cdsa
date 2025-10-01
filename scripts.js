document.getElementById("year").textContent = new Date().getFullYear();
const EBOOKS = [
  {
    title: "Consumer Dispute System Blueprint",
    cover: "https://via.placeholder.com/150x200",
    blurb: "Step-by-step system for building and running your dispute process effectively.",
    url: "https://payhip.com/b/4OyJS"
  },
  {
    title: "Credit Repair Letters Pack",
    cover: "https://via.placeholder.com/150x200",
    blurb: "Collection of professional dispute and validation letter templates.",
    url: "https://payhip.com/b/vdB58"
  },
  {
    title: "NPI Doctrine Explained",
    cover: "https://via.placeholder.com/150x200",
    blurb: "Understand Non-Public Information (NPI) and how it applies to your consumer rights.",
    url: "https://payhip.com/b/wHflQ"
  }
];
function renderEbooks() {
  const grid = document.getElementById("ebooksGrid");
  if (!grid) return;
  grid.innerHTML = "";
  EBOOKS.forEach(item => {
    const card = document.createElement("div");
    card.className = "ebook-card";
    card.innerHTML = `<img src="${item.cover}" alt="${item.title}"/>
      <h4>${item.title}</h4><p>${item.blurb}</p>
      <a href="${item.url}" target="_blank" class="button">View on PayHip</a>`;
    grid.appendChild(card);
  });
}
renderEbooks();
