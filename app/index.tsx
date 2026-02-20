import * as Linking from 'expo-linking';
import { ArrowUpRight, BriefcaseBusiness, Code2, Mail, Sparkles } from 'lucide-react-native';
import type { ComponentType, ReactNode } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui/text';

const PROJECTS = [
  {
    title: 'Nano AI',
    description: 'A native-quality cross-platform Ollama chat app focused on privacy, speed, and polished UX.',
    tech: ['React Native', 'Expo', 'Ollama']
  },
  {
    title: 'Realtime Portfolio',
    description: 'A modern developer portfolio with animated sections, project showcases, and clear call-to-actions.',
    tech: ['TypeScript', 'Tailwind', 'Framer Motion']
  },
  {
    title: 'Dev Tools Suite',
    description: 'A collection of CLI and web tooling that improves productivity for teams building AI products.',
    tech: ['Node.js', 'Python', 'Automation']
  }
];

const SKILLS = ['Frontend Development', 'Backend APIs', 'Mobile App Development', 'AI Integrations', 'Performance Optimization'];

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-neutral-950" contentContainerClassName="px-safe-offset-6 pb-safe pt-safe">
      <View className="mx-auto w-full max-w-5xl gap-y-6 py-10">
        <View className="gap-y-4 rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6">
          <View className="flex-row items-center gap-x-2">
            <Sparkles size={16} color="#67e8f9" />
            <Text className="text-xs uppercase tracking-[2px] text-cyan-300">Kuldeep • Software Developer</Text>
          </View>
          <Text className="text-4xl font-semibold leading-tight text-white">Building clean, fast, and useful digital experiences.</Text>
          <Text className="text-base leading-7 text-neutral-300">I design and build websites, apps, and AI-powered products with a strong focus on usability, speed, and thoughtful details.</Text>
          <View className="flex-row flex-wrap gap-3">
            <PrimaryButton text="View Projects" url="https://crevekuldeep.com/#projects" />
            <SecondaryButton text="Contact Me" url="mailto:hello@crevekuldeep.com" />
          </View>
        </View>

        <SectionCard title="About" icon={Code2}>
          <Text className="text-neutral-300">I am a full-stack developer who enjoys turning ideas into polished products. From intuitive UI to scalable APIs, I deliver end-to-end solutions that are practical and performance-driven.</Text>
        </SectionCard>

        <SectionCard title="Skills" icon={BriefcaseBusiness}>
          <View className="flex-row flex-wrap gap-2">
            {SKILLS.map(skill => (
              <View key={skill} className="rounded-full border border-cyan-800 bg-cyan-950/40 px-3 py-2">
                <Text className="text-sm text-cyan-200">{skill}</Text>
              </View>
            ))}
          </View>
        </SectionCard>

        <SectionCard title="Featured Projects" icon={Sparkles}>
          <View className="gap-y-3">
            {PROJECTS.map(project => (
              <View key={project.title} className="gap-y-3 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
                <Text className="text-lg font-medium text-white">{project.title}</Text>
                <Text className="text-neutral-300">{project.description}</Text>
                <View className="flex-row flex-wrap gap-2">
                  {project.tech.map(item => (
                    <View key={item} className="rounded-full border border-neutral-700 px-3 py-1">
                      <Text className="text-xs text-neutral-300">{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </SectionCard>

        <SectionCard title="Get in Touch" icon={Mail}>
          <Text className="mb-3 text-neutral-300">Have an idea, freelance project, or collaboration in mind? Let&apos;s connect.</Text>
          <PrimaryButton text="hello@crevekuldeep.com" url="mailto:hello@crevekuldeep.com" />
        </SectionCard>
      </View>
    </ScrollView>
  );
}

function SectionCard({ children, title, icon: Icon }: { children: ReactNode; title: string; icon: ComponentType<{ color?: string; size?: number }> }) {
  return (
    <View className="gap-y-3 rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6">
      <View className="flex-row items-center gap-x-2">
        <Icon size={16} color="#67e8f9" />
        <Text className="text-lg font-medium text-white">{title}</Text>
      </View>
      {children}
    </View>
  );
}

function PrimaryButton({ text, url }: { text: string; url: string }) {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)} className="flex-row items-center gap-x-2 rounded-full border border-cyan-400 bg-cyan-400 px-4 py-2 active:opacity-80">
      <Text className="font-medium text-cyan-950">{text}</Text>
      <ArrowUpRight size={16} color="#083344" />
    </TouchableOpacity>
  );
}

function SecondaryButton({ text, url }: { text: string; url: string }) {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)} className="rounded-full border border-neutral-700 px-4 py-2 active:opacity-80">
      <Text className="font-medium text-neutral-100">{text}</Text>
    </TouchableOpacity>
  );
}
