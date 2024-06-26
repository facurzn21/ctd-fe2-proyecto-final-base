import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import {
  Container,
  Imagen,
  Nombre,
  Descripcion,
  ContainerBotones,
  Boton,
} from "./styled";

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(INFO_SIMPSONS[NombresSimpsons.BART]);

  const onClick = (nombre: NombresSimpsons) => setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () => {
    return Object.values(NombresSimpsons).map((nombre) => (
      <Boton
        key={nombre}
        onClick={() => onClick(nombre)}
        isActive={bioActiva.id === nombre}
      >
        {INFO_SIMPSONS[nombre].nombre}
      </Boton>
    ));
  };

  return (
    <Container data-testid="bioContainer">
      <ContainerBotones>{crearBotones()}</ContainerBotones>
      <div>
        <div>
          <Imagen src={bioActiva.image} alt={bioActiva.nombre} />
        </div>
        <div>
          <Nombre>{bioActiva.nombre}</Nombre>
          <Descripcion>{bioActiva.descripcion}</Descripcion>
        </div>
      </div>
    </Container>
  );
};

export default Bio;