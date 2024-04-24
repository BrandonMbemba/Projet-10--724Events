import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

       // Récupération des valeurs des champs de saisie
       const formData = new FormData(evt.target);
       const name = formData.get("name");
       const firstName = formData.get("firstName");
       const type = formData.get("type");
       const email = formData.get("email");
       const message = formData.get("message");

       // Vérification des informations manquantes
       if (!name || !firstName || !type || !email || !message) {
        setSending(false);
        return alert("Veuillez remplir tous les champs");
      }

      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
      // Ajout de onSucces dans le try pour afficher la confirmation du message envoyé
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }

      // Retourner null à la fin de la fonction
      return null;
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field name="name" placeholder="" label="Nom" />
          <Field name="firstName" placeholder="" label="Prénom" />
          <Select
            name="type"
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field name="email" placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            name="message"
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
