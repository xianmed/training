async function getProgramCourses(programId)
{
    const text =
        await fetch("data/course_listings.txt")
        .then(r=>r.text());

    const lines =
        text.split("\n");

    for(const line of lines)
    {
        if(!line.includes("="))
            continue;

        const [id,courses] =
            line.split("=");

        if(id.trim() === programId.trim())
        {
            return courses
                .split(",")
                .map(x=>x.trim());
        }
    }

    return [];
}