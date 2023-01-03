import Game from '../../pages/Game';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

	test('this is going to render Game page', () => {
		render(
			<BrowserRouter>
				<Game />
			</BrowserRouter>
		);
        
		expect(screen.getByTestId('game-logeduser')).toBeInTheDocument();
		expect(screen.getByTestId('game-logout')).toBeInTheDocument();
		expect(screen.getByTestId('game-clickergame')).toBeInTheDocument();
		expect(screen.getByTestId('game-points-title')).toBeInTheDocument();
		expect(screen.getByTestId('game-points')).toBeInTheDocument();
		expect(screen.getByTestId('game-points-units')).toBeInTheDocument();
		expect(screen.getByTestId('game-autoclikers-title')).toBeInTheDocument();
		expect(screen.getByTestId('game-autoclikers')).toBeInTheDocument();
		expect(screen.getByTestId('game-autoclikers-units')).toBeInTheDocument();
		expect(screen.getByTestId('game-btnclick')).toBeInTheDocument();
		expect(screen.getByTestId('game-btnAutoclicker')).toBeInTheDocument();
		expect(screen.getByTestId('game-rank-id')).toBeInTheDocument();
		expect(screen.getByTestId('game-rank-name')).toBeInTheDocument();
		expect(screen.getByTestId('game-rank-points')).toBeInTheDocument();
		expect(screen.getByTestId('game-rank-autoclicker')).toBeInTheDocument();

        
	});
