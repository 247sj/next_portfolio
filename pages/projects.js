import Seo from '../components/seo'
import { TOKEN, DATABASE_ID } from '../config'
import ProjectItem from '../components/projects/project-item'
export default function Projects({ projects }) {
  console.log(projects)
  return (
    <div className="flex flex-col items-center jutify-center min-h-screen mb-10 px-6">
      <Seo title="Projects" />
      <h1 className="text-4xl font-bold sm:text-6xl">
        총 프로젝트 :
        <span className="pl-4 text-blue-500">{projects.results.length}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 py-10 m-6 gap-8">
        {projects.results.map((aProject) => (
          <ProjectItem data={aProject} key={aProject} />
        ))}
      </div>
    </div>
  )
}

// 빌드 타임에 호출
// export async function getStaticProps() {

// 각 요청 때마다 호출
export async function getStaticProps() {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-02-22',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      sorts: [
        {
          property: 'Name',
          direction: 'ascending',
        },
      ],
      page_size: 100,
    }),
  }

  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    options,
  )

  const projects = await res.json()

  console.log(projects)

  const projectNames = projects.results.map(
    (aProject) => aProject?.properties?.Name?.title[0]?.plain_text || null,
  )

  console.log(`projectNames: ${projectNames}`)

  return {
    props: { projects }, // will be passed to the page component as props
    // getStaticProps() 메소드를 사용한다면 revalidate 로 데이터 변경시 갱신가능!
    // revalidate: 1 // 데이터 변경이 있으면 갱신 1초 마다
  }
}
