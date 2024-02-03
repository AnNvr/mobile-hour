export default function Landing() {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage:
                    "url(https://images.pexels.com/photos/8638608/pexels-photo-8638608.jpeg)",
            }}
        >
            {/* <div className="hero-overlay bg-opacity-60"></div> */}
            <div className="z-1 hero-content text-center text-neutral-content">
                <div className="max-w-md bg-black bg-opacity-70 text-white p-6 border-b-8 border-primary">
                    <h1 className="mb-5 text-5xl font-bold">New releases in our catalogue!</h1>
                    <p className="mb-5">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
}
