
import { GameCategory } from '../constants.js';

export const GAMES = [
  {
    id: '1',
    title: 'Pac-Man Classic',
    category: GameCategory.CLASSIC,
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    thumbnail: 'https://picsum.photos/seed/pacman/400/300',
    description: 'The legendary arcade game where you eat pellets and dodge ghosts in a maze.',
    rating: 4.8,
    plays: 12400
  },
  {
    id: '2',
    title: '2048 Master',
    category: GameCategory.PUZZLE,
    url: 'https://play2048.co/',
    thumbnail: 'https://picsum.photos/seed/2048/400/300',
    description: 'Join the numbers and get to the 2048 tile in this addictive puzzle challenge.',
    rating: 4.5,
    plays: 8900
  },
  {
    id: '3',
    title: 'Snake Arcade',
    category: GameCategory.CLASSIC,
    url: 'https://www.google.com/logos/2010/snake-i.html',
    thumbnail: 'https://picsum.photos/seed/snake/400/300',
    description: 'Classic snake gameplay. Eat to grow longer but don\'t hit the walls or yourself!',
    rating: 4.2,
    plays: 15600
  },
  {
    id: '4',
    title: 'Tic-Tac-Toe Pro',
    category: GameCategory.STRATEGY,
    url: 'https://playtictactoe.org/',
    thumbnail: 'https://picsum.photos/seed/tictactoe/400/300',
    description: 'The ultimate strategy game of Xs and Os. Play against the computer or a friend.',
    rating: 4.0,
    plays: 5400
  },
  {
    id: '5',
    title: 'Doodle Jump Demo',
    category: GameCategory.ACTION,
    url: 'https://doodle-jump.io/game/',
    thumbnail: 'https://picsum.photos/seed/doodle/400/300',
    description: 'Jump as high as you can while avoiding monsters and broken platforms.',
    rating: 4.7,
    plays: 21000
  },
  {
    id: '6',
    title: 'Hextris',
    category: GameCategory.PUZZLE,
    url: 'https://hextris.io/',
    thumbnail: 'https://picsum.photos/seed/hextris/400/300',
    description: 'A fast-paced puzzle game where you rotate a hexagon to match blocks.',
    rating: 4.4,
    plays: 7200
  },
  {
    id: '7',
    title: 'Tetris Lite',
    category: GameCategory.CLASSIC,
    url: 'https://tetris.com/play-tetris',
    thumbnail: 'https://picsum.photos/seed/tetris/400/300',
    description: 'The worlds most famous block-stacking puzzle game.',
    rating: 4.9,
    plays: 35000
  },
  {
    id: '8',
    title: 'Crossy Road Web',
    category: GameCategory.ACTION,
    url: 'https://poki.com/en/g/crossy-road',
    thumbnail: 'https://picsum.photos/seed/crossy/400/300',
    description: 'Why did the chicken cross the road? Find out in this endless hopper!',
    rating: 4.6,
    plays: 28000
  }
];
