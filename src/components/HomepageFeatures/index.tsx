import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Img: any; // Using any for image import compatibility
  description: React.JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Tech work is a hobby as well as a profession.",
    Img: require("@site/static/img/laptop.webp").default,
    description: (
      <>
        I enjoy learning and trying new things. Earlier in my career this
        included learning languages like Perl and RegEx and building with VMWare
        and SAN. More recently I am enjoying learning Terraform and various use
        cases for YAML, as well as JAMstack and TypeScript.
      </>
    ),
  },
  {
    title: "Hi, My name is Bryan",
    Img: require("@site/static/img/bryan-portrait-sm.webp").default,
    description: (
      <>
        Welcome to my new site. I built this simple collection of pages using{" "}
        <a href="https://docusaurus.io/" target="_blank">
          Docusaurus
        </a>{" "}
        and <a href="https://pages.cloudflare.com">Cloudflare Pages</a>. I've
        done plenty of AWS and Azure cloud and systems level development, and
        now I&apos;m challenging myself to learn some new skills.
      </>
    ),
  },
  {
    title: "I also love to be outdoors.",
    Img: require("@site/static/img/IMG_3338.webp").default,
    description: (
      <>
        I'm glad to live in a particularly naturally beautiful part of our
        world. I enjoy biking, fishing, and skiing or snowboarding in the
        winter.
      </>
    ),
  },
];

function Feature({ title, Img, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img
          className={styles.featureImage}
          role="img"
          src={typeof Img === 'string' ? Img : Img.src || Img}
          height="300"
          alt={title}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
