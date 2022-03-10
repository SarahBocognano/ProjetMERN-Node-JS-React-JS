import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../assets/mountain-lake-header_1.jpg";
import Logo from "../assets/Logo.png";
import "../styles/profil.css";
import "../styles/EditProfil.css";

function EditProfil(props) {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    let [nom, setNom] = useState("");
    const handleChangeNomField = (event) => {
        setNom(event.target.value);
    };

    let [prenom, setPrenom] = useState("");
    const handleChangePrenomField = (event) => {
        setPrenom(event.target.value);
    };

    let [naissance, setNaissance] = useState("");
    const handleChangeNaissanceField = (event) => {
        setNaissance(event.target.value);
    };

    let [pseudo, setPseudo] = useState("");
    const handleChangePseudoField = (event) => {
        setPseudo(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (nom === "" || prenom === "" || naissance === "" || pseudo === "") {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
        sendEdit();
        console.log("it's working");
        navigate("/");
    };

    const sendEdit = async () => {
        await fetch("http://localhost:3002/profil", {
            method: "PUT",
            headers: {
                Authorization: "bearer " + localStorage.getItem("@token"),
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                nom: nom,
                prenom: prenom,
                naissance: naissance,
                pseudo: pseudo,
            }),
        });
        console.log("I have changed");
    };

    return (
        <div className="profil">
            <div className="Header">
                <div className="backgroundImg">
                    <img src={Header} className="imageHeader" />
                    <img src={Logo} className="imageLogoHeader" />
                </div>
            </div>
            <div className="FormulaireEdit">
                <form className="FormForm">
                    <div className="inputName">
                        <label>Votre Nom: </label>
                        <input
                            type="text"
                            placeholder=" Nom"
                            className="inputNom"
                            name="nom"
                            value={nom}
                            onChange={handleChangeNomField}
                        />
                    </div>
                    <div className="inputPrenom">
                        <label>Votre Prenom: </label>
                        <input
                            type="text"
                            placeholder=" Prenom"
                            className="inputPrenom"
                            name="prenom"
                            value={prenom}
                            onChange={handleChangePrenomField}
                        />
                    </div>
                    <div className="inputNaissance">
                        <label>Votre Date de Naissance: </label>
                        <input
                            type="text"
                            placeholder=" Date de Naissance"
                            className="inputNaissance"
                            name="naissance"
                            value={naissance}
                            onChange={handleChangeNaissanceField}
                        />
                    </div>
                    <div className="inputPseudo">
                        <label>Votre Pseudo: </label>
                        <input
                            type="text"
                            placeholder=" Pseudo"
                            className="inputPseudo"
                            name="pseudo"
                            value={pseudo}
                            onChange={handleChangePseudoField}
                        />
                    </div>
                    <button className="buttonFormEdit" onClick={handleSubmit}>
                        Edit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfil;
