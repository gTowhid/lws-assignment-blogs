import Sidebar from '../components/Sidebar';
import PostsContainer from '../components/PostsContainer';

export default function Home() {
    return <>
        <section className='wrapper'>
            <Sidebar />
            <PostsContainer />
        </section>
    </>
    
}