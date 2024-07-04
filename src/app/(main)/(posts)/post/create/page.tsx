'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { createPost, getHastags } from '@/api/posts/posts';
import { Button, ButtonTitle } from '@/components/ui/Button';
import useIdenticon from '@/hooks/useIdenticons';
import { useAuthStore } from '@/stores/authStore';

interface Hashtag {
  hashtag: string;
  totalPosts: number;
}

const CreatePost: React.FC = () => {
  const router = useRouter();
  const imageData = useIdenticon(40);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hashtagDropdownRef = useRef<HTMLUListElement>(null);
  const [postBody, setPostBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [hashtagsLoading, setHashtagsLoading] = useState(true);
  const [currentWord, setCurrentWord] = useState('');
  const [availableHashtags, setAvailableHashtags] = useState<Hashtag[]>([]);
  const [hashtagPosition, setHashtagPosition] = useState({ top: 0, left: 0 });
  const [demoHashtags, setDemoHashtags] = useState<Hashtag[]>([]);
  const accessToken = useAuthStore((state) => state.accessToken);
  const axiosConfig = { headers: { Authorization: `Bearer ${accessToken}` } };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '80px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
    handleHashtags();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        hashtagDropdownRef.current &&
        !hashtagDropdownRef.current.contains(event.target as Node)
      ) {
        setAvailableHashtags([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePostSubmit = async () => {
    if (loading) return;
    if (!postBody) {
      toast.error('Post body cannot be empty');
      return;
    }
    setLoading(true);
    const hashtagsUsedList: string[] = [];
    if (document) {
      const hashtagsUsed = document.getElementsByClassName('hashtag');
      const hashtagsArray = Array.from(hashtagsUsed);
      hashtagsArray.map((hashtag) => {
        const hashtagText = hashtag?.textContent?.replace('#', '');
        if (hashtagText) {
          hashtagsUsedList.push(hashtagText);
        }
      });
    }
    const res = await createPost(postBody, hashtagsUsedList, axiosConfig);
    if (res) {
      setPostBody('');
      setLoading(false);
      router.push('/posts');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setPostBody(text);

    const words = text.split(' ');
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith('#')) {
      setCurrentWord(lastWord);
      setAvailableHashtags(
        demoHashtags.filter((hashtagObj) => hashtagObj.hashtag.startsWith(lastWord))
      );
      updateHashtagPosition(e.target);
    } else {
      setCurrentWord('');
      setAvailableHashtags([]);
    }
  };

  const handleHashtags = async () => {
    const res = await getHastags(axiosConfig);
    setDemoHashtags(res?.hashtags || []);
    setHashtagsLoading(false);
  };

  const updateHashtagPosition = (textarea: HTMLTextAreaElement) => {
    const { selectionStart } = textarea;
    const textBeforeCursor = textarea.value.substring(0, selectionStart);
    const lines = textBeforeCursor.split('\n');
    const currentLine = lines[lines.length - 1];
    const cursorPosition = {
      top: textarea.scrollTop + lines.length * 38,
      left: textarea.scrollLeft + currentLine.length * 10,
    };

    const container = containerRef.current;
    const containerRect = container?.getBoundingClientRect();
    const textareaRect = textarea.getBoundingClientRect();

    if (cursorPosition.left + 200 > textareaRect.width) {
      cursorPosition.left = textareaRect.width - 200;
    }

    if (containerRect && cursorPosition.top + 100 > containerRect.height) {
      cursorPosition.top = containerRect.height - 100;
    }

    setHashtagPosition(cursorPosition);
  };

  const renderTextWithHashtags = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      if (word.startsWith('#') && word.length > 1) {
        return (
          <span key={index} className="hashtag mr-2 cursor-pointer text-blue-500 hover:underline">
            {word}
          </span>
        );
      }
    });
  };

  const highlightHashtag = (hashtag: string) => {
    const match = hashtag.match(new RegExp(`(${currentWord})`, 'i'));
    if (match) {
      const parts = hashtag.split(match[1]);
      return (
        <>
          {parts[0]}
          <b>{match[1]}</b>
          {parts[1]}
        </>
      );
    }
    return hashtag;
  };

  return (
    <div
      ref={containerRef}
      className="grid min-h-[calc(100vh-200px)] w-full grid-cols-1 bg-common-background md:min-h-[calc(100vh-58px)] md:grid-cols-[1fr_400px]"
    >
      <div className="flex w-full flex-col items-center">
        <div className="relative flex h-full w-full flex-col items-center justify-between bg-common-cardBackground pb-8 md:p-4">
          <div className="flex h-full w-full overflow-y-scroll p-2 md:p-0">
            <div className="sticky top-0 h-fit w-fit">
              <Image
                src={`data:image/png;base64,${imageData}`}
                width={40}
                height={40}
                alt="user"
                className="rounded-full border border-common-minimal"
              />
            </div>
            <div className="h-[calc(100vh-100px)] w-full">
              <textarea
                ref={textareaRef}
                className="min-h-[80%] w-full bg-common-cardBackground px-4 text-text-primary focus:outline-none focus:ring-0"
                placeholder="What is on your mind?"
                onInput={(e) => {
                  adjustTextareaHeight();
                  handleInputChange(e as ChangeEvent<HTMLTextAreaElement>);
                }}
                value={postBody}
                onChange={handleInputChange}
                readOnly={loading}
              />
              {availableHashtags.length > 0 && (
                <ul
                  ref={hashtagDropdownRef}
                  className="absolute z-10 mt-1 min-w-80 max-w-96 rounded-common-lg border border-common-minimal bg-common-cardBackground shadow-common"
                  style={{ top: `${hashtagPosition.top}px`, left: `${hashtagPosition.left}px` }}
                >
                  {availableHashtags.map((hashtagObj, index) => (
                    <li
                      key={index}
                      className="flex cursor-pointer items-center justify-between p-2 hover:bg-common-minimal"
                      onClick={() => {
                        setPostBody(postBody + hashtagObj.hashtag.substring(currentWord.length));
                        setAvailableHashtags([]);
                      }}
                    >
                      <span className="text-text-primary">
                        {highlightHashtag(hashtagObj.hashtag)}
                      </span>
                      <span className="text-xs italic text-text-tertiary">
                        {hashtagObj.totalPosts} posts
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-2 flex w-full flex-row flex-wrap md:hidden">
                <span className="text-sm text-text-tertiary">Hashtags used: </span>
                <span className="flex w-full flex-wrap">{renderTextWithHashtags(postBody)}</span>
              </div>
            </div>
          </div>
          <Button
            className="mx-auto mt-4 w-11/12 rounded-full bg-functional-green py-3 text-neutral-0 md:hidden"
            loading={loading}
            onClick={handlePostSubmit}
          >
            <ButtonTitle className="text-neutral-0">Post</ButtonTitle>
          </Button>
        </div>
      </div>
      <div className="hidden h-full w-full gap-4 border-l border-common-minimal p-4 md:flex md:flex-col">
        <div className="mt-2 flex w-full flex-row flex-wrap border-b border-common-contrast pb-4">
          <span className="text-sm text-text-secondary">Hashtags used: </span>
          <span className="flex w-full flex-wrap">{renderTextWithHashtags(postBody)}</span>
        </div>
        <div className="mt-2 flex w-full flex-row flex-wrap border-b border-common-contrast pb-4">
          <span className="mb-1 text-sm text-text-secondary">Popular Hashtags: </span>
          <span className="flex w-full flex-wrap gap-2">
            {!hashtagsLoading ? (
              demoHashtags?.map((hashtagObj, index) => {
                return (
                  hashtagObj?.totalPosts > 0 && (
                    <div
                      key={index}
                      className="flex items-center border-r border-common-heavyContrast"
                    >
                      <span className="mr-2 cursor-pointer text-blue-500 hover:underline">
                        {hashtagObj?.hashtag}
                      </span>
                      <span className="pr-2 text-xs text-text-tertiary">
                        ({hashtagObj?.totalPosts}&nbsp;posts)
                      </span>
                    </div>
                  )
                );
              })
            ) : (
              <div className="flex w-full flex-wrap gap-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-4 w-20 animate-pulse rounded-full bg-slate-200" />
                ))}
              </div>
            )}
          </span>
        </div>
        <Button
          className="mx-auto mt-auto w-11/12 rounded-full bg-functional-green py-3 text-neutral-0 md:w-full"
          loading={loading}
          onClick={handlePostSubmit}
        >
          <ButtonTitle className="text-neutral-0">Post</ButtonTitle>
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
