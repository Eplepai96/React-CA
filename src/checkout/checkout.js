import { Link } from "react-router-dom"

export function Checkout () {
    return(
        <div>
            <h1>Thank you for your purchase!</h1>
            <p>Hope to see you again soon</p>
            <Link to="/"><button className="byn-primary">Back to homepage</button></Link>
        </div>
    ) 

}