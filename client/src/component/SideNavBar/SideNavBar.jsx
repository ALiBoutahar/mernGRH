import React, { useState, useEffect} from "react";
import "./SideNavBar.css";
import { Link } from "react-router-dom";
const SideNavBar = (props) => {
	const [isExpanded, setExpendState] = useState(false)
	const [utilisateur , setUtilisateur] = useState()

	const Logout = () =>{
        window.confirm("volez vous déconnexion !")&& window.localStorage.clear();
        window.location.href="/Login";
    }

	useEffect(()=>{
        fetch("http://localhost:5000/userData", {
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                 Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                token:window.localStorage.getItem("token"),
            }),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.data)
            setUtilisateur(data.data.user) 
        });
    },[])

	const menuItems = [
		{
			id : 1,
			text: "Accueil",
			icon: "icons/grid.svg",
			to : "/"
		},
		// {
		// 	id : 2,
		// 	text: "Produits",
		// 	icon: "icons/shopping-cart.svg",
		// 	to : "/"		
		// },
		{
			id : 3,
			text: "Employer",
			icon: "icons/user.svg",
			to : "/Patient"
		},
		// {
		// 	id : 4,
		// 	text: "Statistic",
		// 	icon: "icons/pie-chart.svg",
		// 	to : "/"	
		// },
		{
			id : 5,
			text: "Type medicament",
			icon: "icons/folder.svg",
			to : "/Contact-us"		
		},
		
		{
			id : 5,
			text: "Parametre",
			icon: "icons/settings.svg",
			to : "/Parametre"		
		},
	];
	return(
		<div
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							<img src="icons/logo.svg" alt="img" />
							<h2>Gestion.RH</h2>
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() => setExpendState(!isExpanded)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
				<div className="nav-menu">
					{/* {menuItems.map((item) => (
						<Link key={item.id}
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							to={item.to}
						>
							<img className="menu-item-icon" src={item.icon} alt="" />
							{isExpanded && <p>{item.text}</p>}
						</Link>
					))}  */}
					{menuItems.map((item) => (
						<Link key={item.id} className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} to={item.to}>
							<img className="menu-item-icon" src={item.icon} alt="" />
							{isExpanded && <p>{item.text}</p>}
						</Link>
					))}
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src="icons/admin-avatar.svg"
							alt="img"
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">{utilisateur}</p>
							<p className="nav-footer-user-position" style={{color : "white"}}>G-R-H Admin</p>
						</div>
					</div>
				)}
				<img className="logout-icon " onClick={Logout} src="icons/logout.svg" alt="img" />		
			</div>
		</div>
	)
};

export default SideNavBar;
