// @flow

import type { Card } from '../entities';
import React from 'react';
import moment from 'moment';

export default class ProductHunt {
    static type = 'producthunt';
    name = 'ProductHunt';
    feedUrl = '';
    
    async getCards(): Promise<Card[]> {
        const resp = await fetch('https://api.producthunt.com/v1/posts?access_token=dc7c32494478755134d0119a32ab620828ca7eea2b4b26f4e272b2472ac8680b'),
            body = await resp.json();

        const { posts } = body;
        let cards = [];
        for(let post of posts) {
            const card: Card = {
                type: ProductHunt.type,
                name: this.name,
                element: <div></div>, // this will contain a react element later on....
                score: post.votes_count,
                timestamp: +moment(post.created_at),
                title: post.name,
                data: {
                    ...post
                }
            };
            cards.push(card);
        }
        
        return cards;
    }
}