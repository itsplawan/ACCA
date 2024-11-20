async function fetchRepoContents() {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${pdfFolder}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Log the data to inspect it
    console.log(data);

    const fileList = document.getElementById("file-list");
    fileList.innerHTML = "";  // Clear previous content

    data.forEach(item => {
        if (item.type === "file" && item.name.endsWith(".pdf")) {
            const listItem = document.createElement("li");

            // Create a link element to open the PDF
            const link = document.createElement("a");
            link.href = item.download_url;  // Direct link to the raw PDF file
            link.textContent = item.name;  // Set the name of the file
            link.target = "_blank";  // Open the PDF in a new tab

            listItem.appendChild(link);
            fileList.appendChild(listItem);
        }
    });
}
