import { ActionIcon, Button, Group, Paper, Select, Text, TextInput } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

interface SocialMedia {
  id: string;
  platform: string;
  url: string;
}

interface SocialMediaSectionProps {
  socialMedia: SocialMedia[];
  onChange: (socialMedia: SocialMedia[]) => void;
}

const PLATFORM_OPTIONS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'youtube', label: 'YouTube' },
];

export const SocialMediaSection = ({ socialMedia, onChange }: SocialMediaSectionProps) => {
  const getAvailablePlatforms = () => {
    const usedPlatforms = new Set(socialMedia.map(s => s.platform));
    return PLATFORM_OPTIONS.filter(p => !usedPlatforms.has(p.value));
  };

  const handleAdd = () => {
    const availablePlatforms = getAvailablePlatforms();
    if (availablePlatforms.length === 0) return;

    const newSocialMedia = {
      id: Date.now().toString(),
      platform: availablePlatforms[0].value,
      url: ''
    };
    onChange([...socialMedia, newSocialMedia]);
  };

  const handleChange = (id: string, field: 'platform' | 'url', value: string) => {
    const updated = socialMedia.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    );
    onChange(updated);
  };

  const handleRemove = (id: string) => {
    onChange(socialMedia.filter(s => s.id !== id));
  };

  const availablePlatforms = getAvailablePlatforms();

  return (
    <Paper shadow="xs" p="md">
      <Text fw={500} size="lg" className="mb-4">Social Media Links</Text>
      
      {socialMedia.map((social) => (
        <Group key={social.id} className="mb-4">
          <Select
            w={150}
            value={social.platform}
            onChange={(value) => value && handleChange(social.id, 'platform', value)}
            data={[
              ...PLATFORM_OPTIONS.filter(p => 
                p.value === social.platform || 
                availablePlatforms.some(ap => ap.value === p.value)
              )
            ]}
          />
          <TextInput
            placeholder={`Enter ${social.platform} URL`}
            value={social.url}
            onChange={(e) => handleChange(social.id, 'url', e.target.value)}
            style={{ flex: 1 }}
          />
          <ActionIcon 
            color="red" 
            variant="light"
            onClick={() => handleRemove(social.id)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      ))}
      
      {availablePlatforms.length > 0 && (
        <Button
          variant="light"
          leftSection={<IconPlus size={16} />}
          onClick={handleAdd}
          fullWidth
        >
          Add Social Media
        </Button>
      )}
    </Paper>
  );
};