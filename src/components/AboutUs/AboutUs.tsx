import Image from "next/image";
import CardAboutUs from "./CardAboutUs";

const AboutUs = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center my-5">
        <h1 className="text-5xl text-white text-center font-bold mb-4">Acerca de nosotros</h1>
        <span className="text-white text-center text-sm w-[60vw]">
                Somos un equipo de siete personas apasionadas por la tecnología
                y el desarrollo web, actualmente cursando un bootcamp fullstack
                en Henry. Nuestro equipo está compuesto por cuatro
                desarrolladores enfocados en el backend y tres dedicados al
                frontend. Nos hemos unido con el objetivo de aprender, crecer y
                enfrentar desafíos tecnológicos juntos. Cada uno de nosotros
                aporta habilidades únicas y una perspectiva fresca, lo que nos
                permite abordar proyectos con creatividad y eficiencia. En el
                backend, trabajamos para construir arquitecturas sólidas y
                eficientes, mientras que en el frontend, nos dedicamos a crear
                interfaces intuitivas y atractivas. Nuestra formación en Henry
                nos ha brindado una base sólida en tecnologías modernas y
                metodologías ágiles, preparándonos para ofrecer soluciones
                innovadoras y de alta calidad. Estamos comprometidos con el
                aprendizaje continuo y la excelencia en cada proyecto que
                emprendemos.
              </span>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center mb-4">
      <CardAboutUs img="/ornella.jpeg" name="Ornella Ferrario" tecnologie="Back end developer" instagram="" facebook="" linkedin="" github=""/>
       <CardAboutUs img="/julieth.jpeg" name="Julieth Perdomo" tecnologie="Back end developer" instagram="" facebook="" linkedin="" github=""/>
       <CardAboutUs img="/JoseFreggiaro.jpeg" name="Jose Freggiaro" tecnologie="Back end developer" instagram="" facebook="" linkedin="" github=""/>
       <CardAboutUs img="/enrique.jpeg" name="Enrique Orozco" tecnologie="Back end developer" instagram="" facebook="" linkedin="" github=""/>
      </div>

      <div className="flex flex-wrap gap-4 justify-center items-center">
       <CardAboutUs img="/eze.jpg" name="Ezequiel Sale" tecnologie="Front end developer" instagram="" facebook="" linkedin="" github=""/>
       <CardAboutUs img="/jose.jpg" name="Jose Llanos" tecnologie="Front end developer" instagram="" facebook="" linkedin="" github=""/>
       <CardAboutUs img="/olvadis.jpeg" name="Olvadis Hernández" tecnologie="Front end developer" instagram="" facebook="" linkedin="" github=""/>
        
      </div>
    </>
  );
};

export default AboutUs;
