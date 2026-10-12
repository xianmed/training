function renderMarkdown(text)
{
    let html = text;

	// Emphasis display blocks
html = html.replace(
    /^> (.+)$/gm,
    '<div class="emp-display">$1</div>'
);

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr>');

    // Unordered lists
    html = html.replace(/^\* (.+)$/gm, '<li>$1</li>');

    // Ordered lists
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

    // Group adjacent LI tags into ULs
    html = html.replace(
        /((?:<li>.*?<\/li>\s*)+)/gs,
        match => `<ul>${match}</ul>`
    );



    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Underline
    html = html.replace(/__(.*?)__/g, '<u>$1</u>');

    // Italics
    html = html.replace(
        /(^|[\s(])\*(?!\s)([^*]+?)\*(?=[\s.,!?;:)]|$)/gm,
        '$1<em>$2</em>'
    );

    // Paragraphs
    html = html
        .split(/\n\s*\n/)
        .map(block =>
        {
            block = block.trim();

            if (
                block.startsWith('<h1') ||
                block.startsWith('<h2') ||
                block.startsWith('<h3') ||
                block.startsWith('<ul') ||
                block.startsWith('<hr') ||
		block.startsWith('<div class="emp-display"')
            )
            {
                return block;
            }

            return `<p>${block.replace(/\n/g, '<br>')}</p>`;
        })
        .join('\n');

    return html;
}