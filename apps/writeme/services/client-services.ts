'use client';

import { upload } from 'next-upload/client';

export async function uploadFile(file: File) {
  const res = await upload(
    { file },
    {
      api: '/upload',
    }
  );

  const url = res[0].url + '/' + res[0].data.key;

  return url;
}

export async function getSuggestions(input: string) {
  try {
    const res = await fetch('https://ai.writeme.co.za/suggest', {
      method: 'post',
      body: JSON.stringify({
        input: input,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  } catch (e: any) {}
}

export async function getParaphrase(input: string) {
  try {
    const res = await fetch('https://ai.writeme.co.za/suggest/paraphrase', {
      method: 'post',
      body: JSON.stringify({
        input: input,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const j = await res.json();
    console.log(j)
    return j;
  } catch (e: any) {}
}

export async function getGrammar(input: string) {
  try {
    const res = await fetch('https://ai.writeme.co.za/grammar', {
      method: 'post',
      body: JSON.stringify({
        input: input,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  } catch (e: any) {}
}

export async function getEntities(input: string) {
  try {
    const res = await fetch('https://ai.writeme.co.za/analysis', {
      method: 'post',
      body: JSON.stringify({
        input: input,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  } catch (e: any) {}
}

export async function getSentiment(input: string) {
  try {
    const res = await fetch('https://ai.writeme.co.za/sentiment', {
      method: 'post',
      body: JSON.stringify({
        input: input,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  } catch (e: any) {}
}

export async function createSession(chapterId: string) {
  try {
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chapterId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create session');
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Error creating session:', error);
    throw error;
  }
}

export async function deleteSession(sessionId: string) {
  try {
    const response = await fetch('/api/session', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete session');
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Error deleting session:', error);
    throw error;
  }
}

export async function createViewableSession(chapterId: string) {
  try {
    const response = await fetch('/api/session/viewable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chapterId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create session');
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Error creating session:', error);
    throw error;
  }
}

export async function deleteViewableSession(sessionId: string) {
  try {
    const response = await fetch('/api/session/viewable', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to Delete session');
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Error Deleting session:', error);
    throw error;
  }
}

export const randomColor = (() => {
  'use strict';

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return () => {
    var h = randomInt(0, 360);
    var s = randomInt(42, 98);
    var l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  };
})();
