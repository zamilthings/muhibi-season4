import { Welcome, ScoreBoard, Results, Captain } from "./components"
import { Footer, NavBar } from "../../components/layout"
import { motion } from "framer-motion"

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <NavBar />
      <Welcome />
      <ScoreBoard />
      <Results />
      <Captain />
      <div className="footer" id="captains">
        <Footer />
      </div>
    </motion.div>
  )
}

export default Home
