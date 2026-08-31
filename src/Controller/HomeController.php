<?php

namespace App\Controller;

use App\Form\ContactType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home', methods: ['GET', 'POST'])]
    public function index(Request $request): Response
    {
        $contactForm = $this->createForm(ContactType::class);
        $contactForm->handleRequest($request);
        $isAjax = $request->isXmlHttpRequest();

        if ($contactForm->isSubmitted() && $contactForm->isValid()) {
            $this->addFlash('success', 'Votre message a bien été envoyé !');

            if ($isAjax) {
                return $this->render('home/_contact_form.html.twig', [
                    'contactForm' => $this->createForm(ContactType::class),
                ]);
            }

            return $this->redirect($this->generateUrl('app_home').'#contact');
        }

        if ($isAjax && $contactForm->isSubmitted()) {
            return $this->render('home/_contact_form.html.twig', [
                'contactForm' => $contactForm,
            ], new Response(status: 422));
        }

        return $this->render('home/index.html.twig', [
            'contactForm' => $contactForm,
        ]);
    }
}
