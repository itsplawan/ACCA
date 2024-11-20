const repoOwner = "itsplawan";  // GitHub username
const repoName = "ACCA";        // GitHub repository name
const pdfFolder = "pdfs";       // Folder where PDFs are stored in the repo

// Fetch the contents of the GitHub repository
async function fetchRepoContents() {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pdfFolder}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const fileList = document.getElementById("file-list");
    fileList.innerHTML = ""; // Clear the loading text

    // Loop through files and create list items
    data.forEach(item => {
        if (item.type === "file" && item.name.endsWith(".pdf")) {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = item.download_url;
            link.target = "_blank";
            link.textContent = item.name;

            listItem.appendChild(link);
            fileList.appendChild(listItem);
        }
    });
}

// Initialize PDF.js to render the selected PDF
let pdfUrl = ""; // Global PDF URL
let currentPage = 1;
let totalPages = 0;

async function renderPDF(pdfUrl) {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(currentPage);

    const scale = 1.5;
    const viewport = page.getViewport({ scale: scale });

    const canvas = document.getElementById('pdf-canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };

    await page.render(renderContext).promise;

    // Update page navigation
    document.getElementById('page-num').textContent = `Page: ${currentPage}`;
}

// Handle the page navigation (Previous/Next)
function changePage(direction) {
    currentPage += direction;
    if (currentPage < 1) {
        currentPage = 1;
    }
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    renderPDF(pdfUrl);
}

// Fetch repo contents when the page loads
window.onload = fetchRepoContents;
