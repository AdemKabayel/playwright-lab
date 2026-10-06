import { test } from '@playwright/test';

test.describe('this is a test suite', ()=> {

    test('this is the first test', () =>{

    })

    test('this is the first test 1', () =>{

    })

    test('this is the first test 2', () =>{

    })
})

test.beforeEach(async ({page})=>{
    await page.goto('https://playground.bondaracademy.com/')
    await page.getByText('Forms').click()
})

 test('this is the first test', async ({page}) => {
    await page.getByText('Form Layouts').click()
    })


     test('this is the first date picker', async ({page}) => {
    await page.getByText('Datepicker').click()
    })