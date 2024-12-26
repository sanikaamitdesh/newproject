import Link from "next/link";
import { Button } from "@mui/material"
export default function Navbar()
{
return (
    <nav className="flex justify-between items-center  bg-blue-900  px-10 py-5">
        <Link className="text-black text-4xl w-auto font-bold " href={"/"}>SANIKA</Link>
        <Link href={"/addTopic"} passHref>
        <Button
          variant="contained"
          color="error" 
          disableElevation
        >
          Add Topic
        </Button>
      </Link>

    </nav>
)
}