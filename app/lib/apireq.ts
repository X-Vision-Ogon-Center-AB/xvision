import { getStoryblokApi } from "@storyblok/react";
import { redirect } from "next/navigation";

export async function GetOgonOperationer() {
  let sbParams = {
    version: "draft" as const,
    starts_with: "ogonoperationer",
    token: process.env.STORYBLOK_TOKEN,
    language: process.env.STORYBLOCK_LANG,
  };

  const client = getStoryblokApi();
  try {
    const data = await client.get(`cdn/stories/`, sbParams);

    if (!data) {
      throw new Error("Not Found");
    }

    return data.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      redirect("/500");
    } else {
      throw error;
    }
  }
}

export async function GetLinsOperationer() {
  let sbParams = {
    version: "draft" as const,
    starts_with: "linsoperationer",
    token: process.env.STORYBLOK_TOKEN,
    language: process.env.STORYBLOCK_LANG,
  };

  const client = getStoryblokApi();
  try {
    const data = await client.get(`cdn/stories/`, sbParams);

    if (!data) {
      throw new Error("Not Found");
    }

    return data.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      redirect("/500");
    } else {
      throw error;
    }
  }
}

export const GetAllLinsOperations = async () => {
  let sbParams = {
    version: "draft" as const,
    starts_with: "linsoperationer",
    token: process.env.STORYBLOK_TOKEN,
    language: process.env.STORYBLOCK_LANG,
  };

  const client = getStoryblokApi();
  try {
    const data = await client.get(`cdn/stories/`, sbParams);

    if (!data) {
      throw new Error("Not Found");
    }

    return data.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      redirect("/500");
    } else {
      throw error;
    }
  }
};

export const getAllPosts = async () => {
  let sbParams = {
    version: "draft" as const,
    starts_with: "blog",
    token: process.env.STORYBLOK_TOKEN,
    language: process.env.STORYBLOCK_LANG,
  };

  const client = getStoryblokApi();
  const data = await client.get(`cdn/stories/`, sbParams);
  return data.data;
};

export const GetGenerlSettings = async () => {
  const token = process.env.STORYBLOK_TOKEN;
  const language = process.env.STORYBLOCK_LANG;

  if (!token) {
    throw new Error("STORYBLOK_TOKEN saknas");
  }

  const searchParams = new URLSearchParams({
    token,
    version: "published",
    cv: Date.now().toString(),
  });

  if (language) {
    searchParams.set("language", language);
  }

  const response = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/generalsettings?${searchParams.toString()}`,
    {
      cache: "no-store",
      next: {
        revalidate: 0,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `GeneralSettings kunde inte hämtas: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  console.log("=================================");
  console.log("VERCEL URL:", process.env.VERCEL_URL);
  console.log("STORYBLOCK_LANG:", language);
  console.log("RETURNED LANG:", data.story?.lang);
  console.log("FULL SLUG:", data.story?.full_slug);
  console.log("CV:", data.cv);
  console.log(
    "POPUP:",
    JSON.stringify(data.story?.content?.popup, null, 2)
  );
  console.log("=================================");

  return data;
};

export const GetOgonLaser = async () => {
  let sbParams = {
    version: "draft" as const,
    token: process.env.STORYBLOK_TOKEN,
    language: process.env.STORYBLOCK_LANG,
  };

  const client = getStoryblokApi();
  try {
    const data = await client.get(`cdn/stories/ogonlaser/`, sbParams);

    if (!data) {
      throw new Error("Not Found");
    }

    return data.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      redirect("/500");
    } else {
      throw error;
    }
  }
};

export const GetLinsOperation = async () => {
  let sbParams = {
    version: "draft" as const,
    token: process.env.STORYBLOK_TOKEN,
    language: process.env.STORYBLOCK_LANG,
  };

  const client = getStoryblokApi();

  try {
    const data = await client.get(`cdn/stories/linsoperation`, sbParams);

    if (!data) {
      throw new Error("Not Found");
    }

    return data.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      redirect("/500");
    } else {
      throw error;
    }
  }
};

export const GetBlog = async (slug: string) => {
  let sbParams = {
    version: "draft" as const,
    token: process.env.STORYBLOK_TOKEN,
    language: process.env.STORYBLOCK_LANG,
  };

  const client = getStoryblokApi();
  try {
    const data = await client.get(`cdn/stories/blog/${slug}`, sbParams);

    if (!data) {
      throw new Error("Not Found");
    }

    return data.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      redirect("/500");
    } else {
      throw error;
    }
  }
};

export const GetBehandlingarSlug = async (slug: string) => {
  let sbParams = {
    version: "draft" as const,
    token: process.env.STORYBLOK_TOKEN,
    language: process.env.STORYBLOCK_LANG,
  };

  const client = getStoryblokApi();
  try {
    const data = await client.get(
      `cdn/stories/ogonoperationer/${slug}`,
      sbParams
    );

    if (!data) {
      throw new Error("Not Found");
    }

    return data.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      redirect("/500");
    } else {
      throw error;
    }
  }
};

export const GetLinsBehandlingarSlug = async (slug: string) => {
  let sbParams = {
    version: "draft" as const,
    token: process.env.STORYBLOK_TOKEN,
    language: process.env.STORYBLOCK_LANG,
  };

  const client = getStoryblokApi();
  try {
    const data = await client.get(
      `cdn/stories/linsoperationer/${slug}`,
      sbParams
    );

    if (!data) {
      throw new Error("Not Found");
    }

    return data.data;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      redirect("/500");
    } else {
      throw error;
    }
  }
};
