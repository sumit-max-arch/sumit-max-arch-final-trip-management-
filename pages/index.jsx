import Login from "../components/auth";
import SimpleLayout from "../components/layout/simple";

export default function Home() {
  return (
    <SimpleLayout>
      <section className="jumbotron text-center">
        <div className="container">
          <h1>Book Your Ticket Trip Now</h1>
          <p className="lead text-muted">Buy Now</p>
          <Login/>
        </div>
      </section>
    </SimpleLayout>
  );
}
