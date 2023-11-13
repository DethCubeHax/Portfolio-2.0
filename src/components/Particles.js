// Create a particles system that connects dots together when they are close enough
// Add particles to the div with id "Home"

function Particles() {
    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const [particles, setParticles] = useState([]);
    const [mouse, setMouse] = useState({ x: null, y: null });
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        setCtx(context);
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
    }, [dimensions]);

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (ctx) {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.lineWidth = 1;
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
                for (let i = 0; i < particles.length; i++) {
                    const distance = Math.sqrt(
                        (particle.x - particles[i].x) ** 2 +
                            (particle.y - particles[i].y) ** 2
                    );
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[i].x, particles[i].y);
                        ctx.stroke();
                    }
                }
            });
        }
    }, [ctx, particles, dimensions]);

    useEffect(()=>{
        if(ctx){
            const handleMouseMove = (e) => {
                setMouse({ x: e.clientX, y: e.clientY });
            };
            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [ctx]);
};

export default Particles;