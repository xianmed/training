const content =
document.getElementById("content");

window.onload = async () =>
{
	const text =
    await fetch(
        `data/handbook.txt`
    ).then(r=>r.text());

    content.innerHTML =
    renderMarkdown(text);
    };



