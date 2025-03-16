import Link from "next/link";
import IPage from "./models/IPage";
import ISubpage from "./models/ISubpage";
import { getPages } from "@/app/utils/pages";
import "./styles/homepage.scss";

export default function Home() {
    const pages = getPages() || [];

    return (
        <>
            <p className="site-notice">
                A new league for Amazing Race 37 is about to start. Emails to submit your ranking have gone out. If you are interested and did not get an email, please email <Link className="standard-link" href="mailto:xfactorleaguesite@gmail.com">xfactorleaguesite@gmail.com</Link>.
            </p>
            {pages.map((p: IPage) => { 
                const keyName = p.name.toLowerCase().replaceAll(" ", "-");
                return (<div key={`links-section-${keyName}`}>
                    <p className="league-link-heading" >Links For { p.name } League</p>
                    <div className="md:flex md:flex-row">{
                        p.subpages.map((pSub: ISubpage, index) => (
                            <p className="standard-link-container md:basis-1/3" key={`${pSub.name.toLowerCase().replaceAll(" ", "-")}-subpage-${index}`}>
                                <Link className="standard-link" key={`links-section-${keyName}-link-${pSub.name.toLowerCase().replaceAll(" ", "-")}`} href={pSub.path}>{ pSub.name}</Link>
                            </p>
                        ))
                    }</div>
                </div>);
            })}
        </>
    );
}
