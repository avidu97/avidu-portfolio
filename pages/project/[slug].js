import Head from "next/head";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl3rbzoet8srg01xk3ialfs6j/master"
);

const QUERY = gql`
  query Project($slug: String!) {
    project(where: { slug: $slug }) {
      id
      slug
      title
      description
      mainImage {
        url
      }
      demoUrl
      platform
      sourceUrl
      projectContent {
        html
      }
      company
      date
      projectImages {
        url
      }
    }
  }
`;

export const SLUGLIST = gql`
  {
    projects {
      slug
    }
  }
`;

export async function getStaticProps({ params }) {
  const slug = params.slug;

  const data = await graphcms.request(QUERY, { slug });

  const project = data.project;

  return {
    props: {
      project,
    },
  };
}

export async function getStaticPaths() {
  const { projects } = await graphcms.request(SLUGLIST);

  return {
    paths: projects.map((project) => ({ params: { slug: project.slug } })),
    fallback: "blocking",
  };
}

export default function Project({ project }) {
  return (
    <div>
      <h1>This is single project page</h1>
      {/* Project container */}
      <div>
        <div>
          <div></div>
          <div>
            <h1>{project.title}</h1>
          </div>
          <div><p></p></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
