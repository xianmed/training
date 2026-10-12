const courseContainer =
document.getElementById("courseButtons");

const lessonSidebar =
document.getElementById("lessonSidebar");

const content =
document.getElementById("content");

function toast(msg)
{
    const t =
    document.getElementById("toast");

    t.innerText = msg;

    t.classList.add("show");

    setTimeout(()=>{
        t.classList.remove("show");
    },2500);
}

document
.getElementById("closeModal")
.onclick = () =>
{
    document
    .getElementById("startupModal")
    .style.display = "none";
};

document
.getElementById("importBtn")
.onclick = () =>
{
    document
    .getElementById("importModal")
    .classList.remove("hidden");
};

document
.getElementById("submitProgram")
.onclick = async () =>
{
    const id =
    document
    .getElementById("programIdInput")
    .value;

    localStorage.setItem(
        "programID",
        id
    );

	updateProgramDisplay(id);

    document
    .getElementById("importModal")
    .classList.add("hidden");

    toast("Transcript Imported");

    loadCourses(id);
};

async function loadCourses(programId)
{
    courseContainer.innerHTML = "";

    const courses =
    await getProgramCourses(programId);

    courses.forEach(course=>{

        const btn =
        document.createElement("button");

        btn.className =
        "course-btn";

        btn.innerText =
        course;

        btn.onclick = () =>
        {
            openCourse(course);
        };

        courseContainer
        .appendChild(btn);
    });
}

async function openCourse(course)
{
    lessonSidebar.classList.remove("hidden");

    const meta =
    await fetch(
        `courses/${course}/meta.txt`
    ).then(r=>r.text());

    const lines =
    meta.split("\n");

    lessonSidebar.innerHTML="";

    lines.forEach(line=>{

        if(!line.includes("="))
            return;

        const [id,title] =
        line.split("=");

        if(isNaN(id))
            return;

        const btn =
        document.createElement("button");

        btn.className =
        "lesson-btn";

        btn.innerText =
        title;

        btn.onclick = () =>
        {
            loadLesson(
                course,
                id
            );
        };

        lessonSidebar.appendChild(btn);
    });

    loadLesson(course,1);
}

async function loadLesson(course,id)
{
    const text =
    await fetch(
        `courses/${course}/${id}.txt`
    ).then(r=>r.text());

    content.innerHTML =
    renderMarkdown(text);
}

window.onload = () =>
{
    const saved =
    localStorage.getItem(
        "programID"
    );

    if(saved)
    {
	updateProgramDisplay(saved);
        loadCourses(saved);
    }
};

function updateProgramDisplay(programId)
{
    const display =
        document.getElementById("currentProgram");

    display.innerHTML =
        `<strong>Program:</strong><br>${programId}`;
}