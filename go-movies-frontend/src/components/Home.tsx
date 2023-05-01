import Ticket from '../images/movie_tickets.jpg'

function Home() {
  return (
    <>
      <div className='text-center'>
        <h2>Find a movie to watch tonight!</h2>
        <hr />
        <img src={Ticket} alt='movie ticket' />
      </div>
    </>
  )
}

export default Home
