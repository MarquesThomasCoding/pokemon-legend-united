import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ actualPage, setActualPage }: Readonly<{ actualPage: number, setActualPage: (value: number) => void }>) {
    const handleChangePage = (state: string) => {
        switch (state) {
            case "previous":
                setActualPage(actualPage - 1);
                break;
            case "next":
                setActualPage(actualPage + 1);
                break;
        }
        window.scrollTo(0, 0);
    };

    return (
        <div className="flex justify-center items-center gap-8 m-8">
            {actualPage > 1 && (
                <button onClick={() => handleChangePage("previous")} className="relative flex items-center justify-center p-4 text-white">
                    <svg className="absolute -z-10 mt-2 w-auto h-full" viewBox="0 0 105 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M104.5 0.5H10.3047L0.5 23.2114V44.5H56.9131H93.8282L104.5 19.9635V0.5Z" fill="black" stroke="black"/>
                    </svg>
                    <ChevronLeft className="mr-2" />
                    Previous
                </button>
            )}
            <button onClick={() => handleChangePage("next")} className="relative flex items-center justify-center p-4 text-white">
                <svg className="absolute -z-10 mt-2 w-auto h-full" viewBox="0 0 105 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M104.5 0.5H10.3047L0.5 23.2114V44.5H56.9131H93.8282L104.5 19.9635V0.5Z" fill="black" stroke="black"/>
                </svg>
                Next
                <ChevronRight className="ml-2" />
            </button>
        </div>
    );
}