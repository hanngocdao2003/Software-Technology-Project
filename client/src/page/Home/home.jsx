import Header from "../../component/header/header";
import Search from "../../component/search/search";
import Slide from "../../component/slide/slide";

function Home() {
    return ( 
       <div id="home">
            <Header/>
            <Slide>
               <Search/>
            </Slide>
       </div>
     );
}

export default Home;