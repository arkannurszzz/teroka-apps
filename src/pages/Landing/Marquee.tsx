interface MarqueeProps {
    text?: string;
    speed?: number;
}

export default function Marquee({ text = 'Teroka adalah ruang kurasi UMKM lokal — di mana setiap produk punya cerita, setiap usaha punya makna, dan setiap dukungan sangat berarti.', speed = 30 }: MarqueeProps) {
    return (
        <div className="relative py-2 md:py-3 overflow-hidden bg-[#D9302C] w-full">
            <div className="flex overflow-hidden whitespace-nowrap w-full">
                <div
                    className="flex animate-marquee whitespace-nowrap"
                    style={{ animationDuration: `${speed}s` }}
                >
                    <span className="text-lg md:text-xl font-medium text-white tracking-wide px-3 md:px-6 whitespace-nowrap">
                        {text}
                    </span>
                    <span className="text-lg md:text-xl font-medium text-white tracking-wide px-3 md:px-6 whitespace-nowrap">
                        {text}
                    </span>
                    <span className="text-lg md:text-xl font-medium text-white tracking-wide px-3 md:px-6 whitespace-nowrap">
                        {text}
                    </span>
                </div>
            </div>
        </div>
    );
}