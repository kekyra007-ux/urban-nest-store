/** Design reminder: 404 should remain elegant and helpful, never abrupt or generic. */
import Container from '@/shared/ui/Container';
import EmptyState from '@/shared/ui/EmptyState';

export default function NotFound() {
  return (
    <Container style={{ paddingBlock: '3rem' }}>
      <EmptyState title="Страница не найдена" description="Похоже, маршрут не существует или был перемещён. Вернись в каталог и продолжи просмотр." href="/catalog" action="Открыть каталог" />
    </Container>
  );
}
