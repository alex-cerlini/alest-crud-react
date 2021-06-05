import React, { useState, useEffect } from "react";

import Form from "./Form";
import { db } from "../firebase";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = () => {
  const [cards, setCards] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [search, setSearch] = useState("");

  const addOrEdit = async (AppObject) => {
    try {
      if (currentId === "") {
        await db.collection("produtos").doc().set(AppObject);
        toast(`${AppObject.title} adicionado com sucesso`, {
          type: "sucess",
          autoClose: 2000,
        });
      } else {
        await db.collection("produtos").doc(currentId).update(AppObject);
        toast(`${AppObject.title} atualizado com sucesso`, {
          type: "info",
          autoClose: 2000,
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCard = async (id) => {
    if (window.confirm("Tem certeza de que deseja apagar o card?")) {
      await db.collection("produtos").doc(id).delete();
      toast("Produto apagado com sucesso", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCards = async () => {
    if (search !== "") {
      await db
        .collection("produtos")
        .where("title", ">=", search)
        .onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setCards(docs);
        });
    } else {
      await db.collection("produtos").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setCards(docs);
      });
    }
  };

  useEffect(() => {
    getCards();
  }, [getCards, search]);

  const showForm = () => {
    document.getElementById("form-main").classList.remove("hide-form");
    document.getElementById("floatting-button-add").classList.add("hide-form");
    document.getElementById("search-bar").classList.add("hide-form");
  };

  return (
    <div>
      <div className="form-margin">
        <Form {...{ addOrEdit, currentId, cards }} />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              className="form-control-lg search-bar w-100"
              onChange={(e) => setSearch(e.target.value)}
              id="search-bar"
              placeholder="Buscar pelo titulo"
            />
          </div>
        </div>
        <div className="row">
          {cards.map((card) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={card.id}>
              <div className="card-style">
                <div className="card-header" id="product-title">
                  <p>{card.title}</p>
                </div>
                <div className="card-body">
                  <img
                    className="card-img rounded-circle"
                    src={card.urlImage}
                  />
                  <h5 className="product-price">{card.price}</h5>
                </div>
                <div className="card-footer container-fluid">
                  <div className="row">
                    <div className="col-6 col-md-6" onClick={showForm}>
                      <button
                        className="btn btn-primary btn-block form-control"
                        onClick={() => setCurrentId(card.id)}
                      >
                        <i className="material-icons">edit</i>
                      </button>
                    </div>
                    <div className="col-6 col-md-6">
                      <button
                        className="btn btn-primary btn-block form-control"
                        onClick={() => deleteCard(card.id)}
                      >
                        <i className="material-icons">delete</i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
