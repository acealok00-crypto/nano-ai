import { useRouter } from 'expo-router';
import { Edit, type LucideIcon, Search, Settings, Trash2, X } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { type GestureResponderEvent, SectionList, View } from 'react-native';

import { cn, isInThisWeek, isInToday } from '@/lib/utils';
import type { Chat } from '@/store/chats';
import { useChats } from '@/store/chats';

import { Button } from './ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from './ui/context-menu';
import { Icon } from './ui/icon';
import { Input } from './ui/input';
import { Text } from './ui/text';

type HistorySection = (Chat & { index: number; latestTs: number })[];

export function DrawerContent(props: { close: () => void }) {
  const { close } = props;
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, { create, switchTo, remove }] = useChats();
  const { current: currentIndex, data } = chats;
  const trimmedSearchTerm = searchTerm.trim().toLocaleLowerCase();
  const hasSearchTerm = trimmedSearchTerm.length > 0;
  const historyData = useMemo(() => {
    const today: HistorySection = [];
    const thisWeek: HistorySection = [];
    const older: HistorySection = [];
    data.forEach((chat, index) => {
      const { messages } = chat;
      if (messages.length > 0) {
        const { createAt } = messages.at(-1)!;
        const data = { ...chat, index, latestTs: createAt };
        if (isInToday(createAt)) {
          today.push(data);
        } else if (isInThisWeek(createAt)) {
          thisWeek.push(data);
        } else {
          older.push(data);
        }
      }
    });

    return [
      {
        title: 'Today',
        data: today.sort((a, b) => b.latestTs - a.latestTs)
      },
      {
        title: 'This week',
        data: thisWeek.sort((a, b) => b.latestTs - a.latestTs)
      },
      {
        title: 'Older',
        data: older.sort((a, b) => b.latestTs - a.latestTs)
      }
    ];
  }, [chats]);
  const searchableHistoryData = useMemo(() => {
    if (!hasSearchTerm) {
      return historyData;
    }

    return historyData
      .map(section => {
        const filteredData = section.data.filter(chat => {
          return chat.messages.some(message => message.content.toLocaleLowerCase().includes(trimmedSearchTerm));
        });

        return { ...section, data: filteredData };
      })
      .filter(section => section.data.length > 0);
  }, [hasSearchTerm, historyData, trimmedSearchTerm]);
  const ActionButton = useCallback((props: { icon: LucideIcon; children: string; onPress?: (e: GestureResponderEvent) => void }) => {
    const { icon, children, onPress } = props;

    return (
      <Button
        variant="ghost"
        className="justify-start"
        onPress={e => {
          close();
          onPress?.(e);
        }}>
        <Icon as={icon} className="size-[18px]" />
        <Text>{children}</Text>
      </Button>
    );
  }, []);

  return (
    <View className="py-safe flex flex-1 flex-col gap-y-2 bg-background px-2">
      <View className="flex-row items-center gap-x-2 px-2">
        <View className="relative flex-1 justify-center">
          <Icon as={Search} className="pointer-events-none absolute left-3 z-10 size-4 text-muted-foreground" />
          <Input value={searchTerm} onChangeText={setSearchTerm} placeholder="Search chat content" className="pl-9" />
        </View>
        {hasSearchTerm ? (
          <Button variant="ghost" size="icon" onPress={() => setSearchTerm('')}>
            <Icon as={X} className="size-[18px]" />
          </Button>
        ) : null}
      </View>
      <SectionList
        className="flex-1"
        sections={searchableHistoryData}
        keyExtractor={(item, index) => `${item.index}_${index}`}
        renderItem={({ item }) => (
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn('mb-1 justify-start', item.index === currentIndex ? 'bg-accent' : '')}
                onPress={() => {
                  switchTo(item.index);
                  close();
                }}>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {item.messages[0].content}
                </Text>
              </Button>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                onPress={() => {
                  remove(item.index);
                }}>
                <Text>Delete</Text>
                <ContextMenuShortcut>
                  <Icon as={Trash2} className="text-muted-foreground" />
                </ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )}
        renderSectionHeader={({ section: { title, data } }) => {
          return data.length > 0 ? (
            <View className="bg-background">
              <Text className="mb-1 ml-3.5 text-xs text-muted-foreground">{title}</Text>
            </View>
          ) : null;
        }}
        ListEmptyComponent={
          hasSearchTerm ? (
            <View className="px-2 py-3">
              <Text className="text-sm text-muted-foreground">No chat content matched your search.</Text>
            </View>
          ) : null
        }
      />
      <View className="flex gap-y-1">
        <ActionButton icon={Edit} onPress={create}>
          New Chat
        </ActionButton>
        <ActionButton
          icon={Settings}
          onPress={() => {
            router.push('/settings');
          }}>
          Settings
        </ActionButton>
      </View>
    </View>
  );
}
