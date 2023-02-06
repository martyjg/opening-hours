import { render, waitFor } from '@testing-library/react';
import { describe, test, expect, afterAll, beforeAll, afterEach } from 'vitest';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL } from './constants';

const openingHours = {
  monday: [
    { type: 'open', value: 30000 },
    { type: 'close', value: 46000 },
    { type: 'open', value: 50000 },
    { type: 'close', value: 60000 },
  ],
};

const server = setupServer(
  rest.get(`${BASE_URL}/data.json`, (_req, res, ctx) => {
    return res(ctx.json(openingHours));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<App />', () => {
  test('App mounts and loads data correctly', async () => {
    const { getByText, getByTestId } = render(<App />);

    expect(getByText('Opening Hours'));
    expect(getByText('Loading...'));

    await waitFor(() => expect(getByText('monday')));
    await waitFor(() => expect(getByText(',')));
    const meta = getByTestId('meta-content');
    const multipleOpenings = meta
      ? await waitFor(() => meta.getAttribute('content'))
      : '';
    expect(multipleOpenings).toMatch('Mo 08:20-12:47, 13:53-16:40');
  });
});
