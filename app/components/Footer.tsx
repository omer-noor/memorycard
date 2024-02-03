export default async function Footer() {   
    return (
        <footer className="sticky top-[100vh] border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
            <p>
                Created by{" "}
                <a
                    href="https://github.com/omer-noor"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                >
                    Omer Noor
                </a>
            </p>
        </footer>
    )
}