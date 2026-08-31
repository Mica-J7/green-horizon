<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints as Assert;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Nom',
                'constraints' => [
                    new Assert\NotBlank(message: 'Merci de renseigner votre nom.'),
                    new Assert\Length(max: 100),
                ],
            ])
            ->add('email', EmailType::class, [
                'label' => 'E-mail',
                'constraints' => [
                    new Assert\NotBlank(message: 'Merci de renseigner votre e-mail.'),
                    new Assert\Email(message: 'Cet e-mail ne semble pas valide.'),
                ],
            ])
            ->add('phone', TelType::class, [
                'label' => 'Téléphone (optionnel)',
                'required' => false,
            ])
            ->add('message', TextareaType::class, [
                'label' => 'Votre projet',
                'attr' => ['rows' => 5, 'maxlength' => 500, 'placeholder' => '500 caractères maximum'],
                'constraints' => [
                    new Assert\NotBlank(message: 'Dites-nous en un peu plus sur votre projet.'),
                    new Assert\Length(min: 10, minMessage: 'Le message doit faire au moins 10 caractères.', max: 500, maxMessage: 'Le message doit faire au maximum 500 caractères.'),
                ],
            ])
            ->add('consent', CheckboxType::class, [
                'label' => 'J\'accepte que mes informations soient utilisées pour être recontacté(e) au sujet de ma demande.',
                'required' => false,
                'constraints' => [
                    new Assert\IsTrue(message: 'Merci d\'accepter l\'utilisation de vos informations pour pouvoir vous répondre.'),
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => null,
            'csrf_protection' => true,
        ]);
    }
}
