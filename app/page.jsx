import Feed from '@components/Feed'
import GoogleGemini from '@components/GoogleGemini'
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
        Explore & Promote
            <br className="max-md:hiddent"/>
            <span className="orange_gradient">Machine Learning Ideas</span>
        </h1>
        <p className="desc text-center">
        Unlock a universe of creative AI prompts, tailored to spark imagination and drive impactful AI solutions.
        </p>

        <Feed/>
    </section>
  )
}

export default Home