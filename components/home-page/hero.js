import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/myprofile.jpg"
          alt="An image showing me"
          width={300}
          height={300}
        />
      </div>
      <h1>FE PROJECT</h1>
      <p>
        프론트엔드 개발자로서 성장하기 위해 진행했던 프로젝트를 정리한
        블로그입니다.
      </p>
    </section>
  );
}
export default Hero;
