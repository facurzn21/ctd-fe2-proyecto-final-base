import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import { ContenedorNoticias, ListaNoticias, TituloNoticias } from "./styled";
import CardNoticia from "./cards/CardNoticia";
import NoticiaModal from "./modals/NoticiaModal";
import { IModal, INoticiasNormalizadas } from "./types";

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<IModal>({
    noticia: null,
    visible: false,
  });

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const ahora = new Date();
      const data = respuesta.map((n) => ({
        id: n.id,
        titulo: n.titulo
          .split(" ")
          .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
          .join(" "),
        descripcion: n.descripcion,
        fecha: ahora.getTime(), 
        esPremium: n.esPremium,
        imagen: n.imagen,
        descripcionCorta: n.descripcion.substring(0, 100),
      }));

      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((noticia) => (
          <CardNoticia
            key={noticia.id.toString()}
            noticia={noticia}
            setModal={setModal}
          />
        ))}
        {modal.visible && (
          <NoticiaModal noticia={modal.noticia} setModal={setModal} />
        )}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;