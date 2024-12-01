import { AppShell, Container, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useLocation } from '@remix-run/react';

const Document = (
  props: any & {
    children: React.ReactNode;
  }
) => {
  const [opened, { toggle }] = useDisclosure();

  const { pathname } = useLocation();

  const { children, ...restData } = props;

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { desktop: true, mobile: !opened }
      }}
      footer={{ height: 100 }}
    >
      <AppShell.Header>
        <Container>Header</Container>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section
          grow
          component={ScrollArea}
          scrollbars="y"
          type="scroll"
        >
          Mobile Menu
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container>{children}</Container>
      </AppShell.Main>

      <AppShell.Footer pos={'relative'}>
        <Container>Footer</Container>
      </AppShell.Footer>
    </AppShell>
  );
};

export default Document;
