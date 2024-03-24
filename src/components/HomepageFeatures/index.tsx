import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Img: React.ComponentType<React.ComponentProps<"img">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Tech work is a hobby as well as a profession.",
    Img: require("@site/static/img/laptop-2.svg").default,
    description: (
      <>
        I enjoy learning and trying new things. Earlier in my career this looked
        like learning languages like Perl and RegEx. More recently it has
        included JAMstack and TypeScript.
      </>
    ),
  },
  {
    title: "Hi, My name is Bryan",
    Img: require("@site/static/img/bryan-portrait-sm.webp").default,
    description: (
      <>
        Welcome to my new site. I built this new web site using Docusaurus, and
        hosting at CloudFlare. I've done plenty of AWS and Azure cloud and
        systems level development, and now I&apos;m challenging myself to learn
        some new skills.
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
        <img className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
