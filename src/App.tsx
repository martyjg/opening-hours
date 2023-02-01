import { GlobalStyles } from './styles/GlobalStyles';
import OpeningHours from './components/OpeningHours/OpeningHours';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <OpeningHours />
    </QueryClientProvider>
  );
}

export default App;
