import { Welcome, ScoreBoard, Results, Captain } from "./components"
import { Footer, NavBar } from "../../components/layout"

function Home() {
  return (
    <div>
      <NavBar />
      <Welcome />
      <ScoreBoard />
      <Results />
      <Captain />
      <div className="footer" id="captains">
        <Footer />
      </div>
    </div>
  )
}

export default Home
