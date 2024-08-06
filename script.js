document.addEventListener('DOMContentLoaded', () => {
    const addEducationBtn = document.getElementById('add-education');
    const addExperienceBtn = document.getElementById('add-experience');
    const addSkillBtn = document.getElementById('add-skill');
    const previewResumeBtn = document.getElementById('preview-resume');
    const downloadPdfBtn = document.getElementById('download-pdf');
    const downloadWordBtn = document.getElementById('download-word');

    addEducationBtn.addEventListener('click', () => addField('education-section', 'Education', 'text'));
    addExperienceBtn.addEventListener('click', () => addField('experience-section', 'Experience', 'textarea'));
    addSkillBtn.addEventListener('click', () => addField('skills-section', 'Skill', 'text'));

    previewResumeBtn.addEventListener('click', previewResume);

    downloadPdfBtn.addEventListener('click', () => downloadResume('pdf'));
    downloadWordBtn.addEventListener('click', () => downloadResume('word'));
});

function addField(sectionId, fieldType, inputType) {
    const section = document.getElementById(sectionId);
    const field = document.createElement('div');
    field.innerHTML = `
        <label for="${fieldType.toLowerCase()}">Enter ${fieldType}:</label>
        <input type="${inputType}" name="${fieldType.toLowerCase()}" required>
    `;
    section.appendChild(field);
}

function previewResume() {
    const form = document.getElementById('resume-form');
    const formData = new FormData(form);
    const output = document.getElementById('resume-output');
    output.innerHTML = '';

    const entries = {};
    formData.forEach((value, key) => {
        if (!entries[key]) {
            entries[key] = [];
        }
        entries[key].push(value);
    });

    for (const [key, values] of Object.entries(entries)) {
        const section = document.createElement('div');
        section.innerHTML = `<h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>`;
        values.forEach(value => {
            const p = document.createElement('p');
            p.textContent = value;
            section.appendChild(p);
        });
        output.appendChild(section);
    }
}

function downloadResume(format) {
    const resumeContent = document.getElementById('resume-output').innerHTML;
    const resumeHtml = `
        <html>
        <head>
            <title>Resume</title>
        </head>
        <body>
            ${resumeContent}
        </body>
        </html>
    `;

    const blob = new Blob([resumeHtml], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume.${format}`;
    link.click();
    URL.revokeObjectURL(url);
}
